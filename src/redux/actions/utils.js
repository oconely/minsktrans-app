export const proxy = 'https://gp-js-test.herokuapp.com/proxy';
const dayNames = ['п', 'в', 'с', 'ч', 'п', 'c', 'в'];
const mapIndexToWeekDay = arr => arr.map(i => dayNames[i - 1])

const setTransportType = operator => {
        if (operator.includes('АП') || operator === '' || operator === 'bus') {
            return 'bus';
        } else if (operator.includes('ТП')) {
            return 'trol';
        } else if (operator.includes('ТР')) {
            return 'tram';
        }
    }
    

export const optimizeRoutesData = routes => 
    routes
        .filter(r => r.routenum.length && (r.operator.includes('ТП') || r.operator.includes('АП') || r.operator.includes('ТР') || r.operator === '' ))
        .map(r => ({
            ...r, 
            routestops: r.routestops.split(','), 
            transport: setTransportType(r.operator),
            weekdays: mapIndexToWeekDay(r.weekdays.split(''))
    }))