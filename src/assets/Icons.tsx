import React from "react";
import { ImageStyle } from "react-native";
import { Icon, IconElement } from "@ui-kitten/components";

export const arrowBack: (style: ImageStyle) => IconElement = (style) => (
  <Icon {...style} name="arrow-back" />
);

export const arrowFront: (style: ImageStyle) => IconElement = (style) => (
  <Icon {...style} name="arrow-forward-outline" />
);

export const home: (style: ImageStyle) => IconElement = (style) => (
  <Icon {...style} name="home-outline" />
);

export const moon: (style: ImageStyle) => IconElement = (style) => (
  <Icon {...style} name="moon-outline" />
);

export const sun: (style: ImageStyle) => IconElement = (style) => (
  <Icon {...style} name="sun-outline" />
);

export const menu: (style: ImageStyle) => IconElement = (style) => (
  <Icon {...style} name="menu" />
);

export const map: (style: ImageStyle) => IconElement = (style) => (
  <Icon {...style} name="map-outline" />
);

export const user: (style: ImageStyle) => IconElement = (style) => (
  <Icon {...style} name="person-outline" />
);

export const emailIcon: (style: ImageStyle) => IconElement = (style) => (
  <Icon {...style} name="email-outline" />
);

export const phone: (style: ImageStyle) => IconElement = (style) => (
  <Icon {...style} name="phone-call-outline" />
);

export const pin: (style: ImageStyle) => IconElement = (style) => (
  <Icon {...style} name="pin-outline" />
);

export const calendar: (style: ImageStyle) => IconElement = (style) => (
  <Icon {...style} name="calendar-outline" />
);

export const search: (style: ImageStyle) => IconElement = (style) => (
  <Icon {...style} name="search-outline" />
);

export const add: (style: ImageStyle) => IconElement = (style) => (
  <Icon {...style} name="plus-outline" />
);

export const clear: (style: ImageStyle) => IconElement = (style) => (
  <Icon {...style} name="backspace-outline" />
);

export const fileAgend: (style: ImageStyle) => IconElement = (style) => (
  <Icon {...style} name="file-text-outline" />
);

export const editText: (style: ImageStyle) => IconElement = (style) => (
  <Icon {...style} name="edit-2-outline" />
);
