import 'dart:io';

import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';
import 'package:shelf/shelf.dart';

/// Middleware to handle authentication based on Bearer Token in Request
///
/// If valid Token (JWT), request is marked as valid
Middleware handleAuth(String secret) {
  return (Handler innerHandler) {
    return (Request request) async {
      final authHeader = request.headers['authorization'];
      JWT? jwt;

      try {
        if (authHeader != null && authHeader.startsWith('Bearer ')) {
          final token = authHeader.substring(7);
          jwt = JWT.verify(token, SecretKey(secret));
        }
      } catch (_) {}

      final updatedRequest = request.change(context: {
        'authDetails': jwt,
      });
      return await innerHandler(updatedRequest);
    };
  };
}

/// Middleware to check authentication by marked request
Middleware checkAuth() {
  return createMiddleware(
    requestHandler: (Request request) {
      if (request.context['authDetails'] == null) {
        return Response.forbidden('Not authorised to perform this action.');
      }
      return null;
    },
  );
}

/// SecurityContext to enable https protocol
// Certificate (HTTPS) for educational purposes implemented like this
SecurityContext getSecurityContext() { // Bind with a secure HTTPS connection
  final chain = Platform.script.resolve('../certificates/server_chain.pem').toFilePath();
  final key = Platform.script.resolve('../certificates/server_key.pem').toFilePath();

  return SecurityContext()
    ..useCertificateChain(chain)
    ..usePrivateKey(key, password: 'dartdart');
}
