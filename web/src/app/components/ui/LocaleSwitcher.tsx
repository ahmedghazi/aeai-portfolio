// import clsx from 'clsx'
// import React from 'react'
// import useLocale from '../../contexts/LocaleWrapper'
// import { _localizeText } from '../../core/utils'
// const locales = require('../../../config/i18n')

// const LocaleSwitcher = ({ buttonSize = 'regular' }) => {
//   const { locale, dispatch } = useLocale()

//   return (
//     <div className="locale-switcher ">
//       <div className="label uppercase mb-1 text-sm">
//         {_localizeText('language')}
//       </div>
//       <ul className="flex">
//         {Object.values(locales).map((item, i) => (
//           <li
//             key={`locale-${i.toString()}`}
//             className={i < Object.values(locales).length - 1 ? 'mr-1' : ''}
//           >
//             <button
//               onClick={() => dispatch(item.locale)}
//               className={clsx(
//                 `btn btn--${buttonSize}`,
//                 locale === item.locale ? 'is-active' : ''
//               )}
//             >
//               {item.label}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default LocaleSwitcher
