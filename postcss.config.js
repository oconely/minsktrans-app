module.exports = {
    parser: require('postcss-comment'),
    plugins: [
        require('postcss-import')({
        }),
        require('precss'),
        require('postcss-preset-env'),
        require('postcss-color-function'),  
        require('postcss-functions')({
            functions: {
                toRem: function(value, rootfz = 16) {    
                    return (value / rootfz) + 'rem';
                },
                toEm: function(value, rootfz = 16) {
                    return (value / rootfz) + 'em';
                },
                toAbs: function(value, rootfz = 16) {
                    return value / rootfz;
                }
            }
        })
    ]
}