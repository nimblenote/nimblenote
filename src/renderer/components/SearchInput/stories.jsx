import React from 'react';
import SearchInput from '.';

export default { title: 'SearchInput' };

export const withPlaceholder = () => <SearchInput />;
export const withQuery = () => <SearchInput query="Testing" />;