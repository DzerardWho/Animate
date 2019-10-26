import typescript from 'rollup-plugin-typescript';
import ignore from 'rollup-plugin-ignore';

export default{
    input: [
        './src/index.ts'
    ],
    plugins: [
        typescript({lib: ['es5', 'es6', 'dom'], target: 'ES2019', removeComments: true, exclude: [ "*.d.ts", "**/*.d.ts" ], allowJs: false}),
        ignore(['twgl'])
    ],
    output: [
        {
            file: 'dist/Base.js',
            name: 'Base',
            format: 'esm',
            sourcemap: true
        }
    ]
}
