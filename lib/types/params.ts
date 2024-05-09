import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import React from 'react';

export type LngParams = {
  lng: string;
};

export type PageParams = {
  children: React.ReactNode;
} & LngParams &
  Params;
