import path = require('path')
import * as commons from './commons'
export const RESOURCE_ROOT = path.resolve(__dirname, '../../', '.sgn')
export const TPL_ROOT = path.join(RESOURCE_ROOT, '_tpl')
export const CORE_CONFIG_PATH = path.join(commons.currentPath(), 'src/app/core/core.module.ts')
export const CORE_IM_ATHOR = '// XBP-NM-CIM-NO-DELETE'
export const CORE_CONFIG_ATHOR = '// XBP-NM-CORE-NO-DELETE'
