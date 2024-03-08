import '@umijs/max/typings';

import { defineConfig } from '@umijs/max';

type URoute = Parameters<typeof defineConfig>[0]['routes'];
declare global {
  type UMIRoute = Exclude<NonNullable<URoute>, false>;
}
