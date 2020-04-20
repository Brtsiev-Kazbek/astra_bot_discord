const axios = require('axios');

const getInfoAboutCOVID = async (message) => {
    const separetedContent = message.content.split(' ');
    const reason = separetedContent[1];
    console.log(reason);
    const response = await axios({
        method: 'GET',
        url: `https://coronavirus-19-api.herokuapp.com/countries/${reason}`,
    });
    const {
        country,
        cases,
        deaths,
        todayCases,
        todayDeaths,
    } = await response.data;
    msg.channel.send({embed: {
        title: 'Coronavirus COVID-2019 (SARS-COV-2)',
        color: '#BF0A00',
        fields: [{
            name: 'Страна',
            value: country,
            inline: false,
        },
        {
            name: 'Количество выявленных',
            value: cases,
            inline: true,
        },
        {
            name: 'Количество умерших',
            value: deaths,
            inline: true,
        },
        {
            name: 'Количество выявленных за сутки',
            value: todayCases,
            inline: false,
        },
        {
            name: 'Количество умерших за сутки',
            value: todayDeaths,
            inline: true,
        },
        ],
    }});
    console.log(response);
};

module.exports.getInfoAboutCOVID = getInfoAboutCOVID;
