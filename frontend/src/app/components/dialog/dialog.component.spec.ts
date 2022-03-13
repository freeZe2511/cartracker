import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DialogComponent} from './dialog.component';
import {HarnessLoader} from "@angular/cdk/testing";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {MatDialogHarness} from "@angular/material/dialog/testing";
import {MatButtonHarness} from "@angular/material/button/testing";
import {expect} from "@angular/flex-layout/_private-utils/testing";

describe('DialogComponent', () => {
  let fixture: ComponentFixture<DialogComponent>;
  let loader: HarnessLoader;

  beforeEach((async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, NoopAnimationsModule],
      declarations: [DialogComponent],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(DialogComponent);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  }),
  );

  it('should work', async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    expect(buttons.length).toBe(2);
  });

  // it('should load harness for dialog', async () => {
  //   const dialogs = await loader.getAllHarnesses(MatDialogHarness);
  //   expect(dialogs.length).toBe(1);
  // });
  //
  // it('should mark confirmed when ok button clicked', async () => {
  //   const okButton = await loader.getHarness(MatButtonHarness.with({selector: "[confirmBtn]"}));
  //   expect(fixture.componentInstance.data.result).toBe(false);
  //   expect(await okButton.isDisabled()).toBe(false);
  //   await okButton.click();
  //   expect(fixture.componentInstance.data.result).toBe(true);
  // });
});
