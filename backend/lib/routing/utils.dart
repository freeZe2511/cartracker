import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';
import 'package:shelf/shelf.dart';

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