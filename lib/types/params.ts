import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import React from 'react';
import { LngParams } from '@/lib/i18n/types';

export type PageParams = {
  children: React.ReactNode;
  params: LngParams & Params;
};
