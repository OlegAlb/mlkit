import React from 'react';

import {storesContext} from '../base/RootStore';

export const useRootStore = () => React.useContext(storesContext);
