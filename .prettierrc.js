module.exports = {
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 100,
  endOfLine: 'auto',
  // 使用tab缩进，默认false
  useTabs: false,
  // 使用分号, 默认true
  semi: false,
  // 行尾逗号,默认none,可选 none|es5|all
  // es5 包括es5中的数组、对象
  // all 包括函数对象等所有可选
  TrailingCooma: 'all',
  // 对象中的空格 默认true
  // true: { foo: bar }
  // false: {foo: bar}
  bracketSpacing: true,
  // JSX标签闭合位置 默认false
  // false: <div
  //          className=""
  //          style={{}}
  //       >
  // true: <div
  //          className=""
  //          style={{}} >
  jsxBracketSameLine: false,
  // 箭头函数参数括号 默认avoid 可选 avoid| always
  // avoid 能省略括号的时候就省略 例如x => x
  // always 总是有括号
  arrowParens: 'avoid',
}
