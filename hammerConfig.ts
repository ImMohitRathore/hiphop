import { Injectable } from '@angular/core';
import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

@Injectable()
export class CustomHammerConfig extends HammerGestureConfig {
  override overrides = {
    pan: { direction: Hammer.DIRECTION_ALL }, // Allow panning in all directions
    swipe: { direction: Hammer.DIRECTION_HORIZONTAL }, // Allow horizontal swiping
  };
}
