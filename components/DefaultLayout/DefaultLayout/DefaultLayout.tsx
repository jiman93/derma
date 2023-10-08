import React from 'react';
import { useAppSelector } from '../../../utils/hooks';
import { selectShowNavbar } from '../../../store/pageConfigSlice';
import { EmptyLayout } from '../EmptyLayout';

export interface LayoutConfig {
  showNavbar: 'full' | 'top' | 'side' | 'none';
  isDarkMode: boolean;
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const showNavbarSelector = useAppSelector(selectShowNavbar);

  if (showNavbarSelector === 'none') {
    return <EmptyLayout>{children}</EmptyLayout>;
  }

  return <Layout>{children}</Layout>;
};
