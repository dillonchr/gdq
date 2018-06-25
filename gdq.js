const domget = require('@dillonchr/domget');
const moment = require('moment');
const SCHEDULE_URL = 'https://gamesdonequick.com/schedule';

module.exports = (callback) => {
    domget(SCHEDULE_URL, (err, dom) => {
        if (err) {
            callback(err);
        } else {
            const speedruns = dom.querySelectorAll('#runTable tbody tr')
                .map((row) => {
                    const tds = row.querySelectorAll('td');
                    if (tds.length === 4) {
                        return {
                            start: moment(tds[0].text.trim()),
                            title: tds[1].text.trim(),
                            runners: tds[2].text.trim()
                        };
                    } else if (row.classNames.includes('second-row')) {
                        return tds[0].text.trim();
                    }
                })
                .reduce((schedule, datum) => {
                    if (typeof datum === 'object') {
                        return [...schedule, datum];
                    } else if (typeof datum === 'string') {
                        const game = schedule[schedule.length - 1];
                        game.estimate = datum;
                        const estimate = datum
                            .split(':')
                            .map(n => +n)
                            .reduce((sum, count, i) => {
                                switch(i) {
                                    case 0:
                                        return sum + (count * 60 * 60);
                                    case 1:
                                        return sum + (count * 60);
                                    case 2:
                                    default:
                                        return sum + count;
                                }
                            }, 0);
                        game.ends = moment(game.start).add(estimate, 's');
                        game.done = moment().isAfter(game.ends);
                    }
                    return schedule;
                }, []);
            callback(null, speedruns);
        }
    });
};
