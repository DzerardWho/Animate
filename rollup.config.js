import typescript from 'rollup-plugin-typescript';

export default{
    input: [
        './src/index.ts'
    ],
    plugins: [
        typescript({lib: ['es5', 'es6', 'dom'], target: 'ES2019', removeComments: true})
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
