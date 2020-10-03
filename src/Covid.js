const axios = require('axios');


/**
 * Class for work with COVID-2019 API
 */
class Covid {
    /**
     * Contructor
     * @param {String} country
     */
    constructor(country) {
        this.country = country;
        this.baseURL = 'https://coronavirus-19-api.herokuapp.com';
    };
    /**
     * Send request to API
     * @param {Object} config
     */
    async getResource({url, method}) {
        const response = await axios({method, url});
        console.log(response.data);
        return response;
    }
    /**
     * Get info COVID about country
     */
    async getInfoAboutCountry() {
        const url = `${this.baseURL}/countries/${this.country}`;
        const data = {
            method: 'GET',
            url: url,
        };
        return await this.getResource(data);
    }
    /**
     * Get all info about COVID in world
     */
    async getInfoAboutWorld() {
        const url = `${this.baseURL}/all`;
        const data = {
            method: 'GET',
            url: url,
        };
        return await this.getResource(data);
    }
    /**
     * Send message to chat
     */
    async sendMessageToChat() {
        let fields = null;
        if (!this.country) {
            const response = await this.getInfoAboutWorld();
            if (response) {
                const {cases, deaths, recovered} = await response.data;
                fields = [
                    {
                        name: 'Место',
                        value: 'World',
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
                        name: 'Количество выздоровленных',
                        value: recovered,
                        inline: true,
                    },
                ];
            }
        } else {
            const response = await this.getInfoAboutCountry();
            if (response) {
                const {
                    country,
                    cases,
                    deaths,
                    todayCases,
                    todayDeaths,
                    recovered,
                } = await response.data;
                fields = [
                    {
                        name: 'Страна',
                        value: country,
                        inline: false,
                    },
                    {
                        name: 'Кол-во выявленных',
                        value: cases,
                        inline: true,
                    },
                    {
                        name: 'Кол-во вылеченых',
                        value: recovered,
                        inline: true,
                    },
                    {
                        name: 'Кол-во умерших',
                        value: deaths,
                        inline: true,
                    },
                    {
                        name: 'Кол-во выявленных за сутки',
                        value: todayCases,
                        inline: true,
                    },
                    {
                        name: 'Кол-во умерших за сутки',
                        value: todayDeaths,
                        inline: true,
                    },
                ];
            }
        }
        msg.channel.send({embed: {
            title: 'Coronavirus COVID-2019 (SARS-COV-2)',
            color: '#BF0A00',
            fields: fields,
        }});
    }
}

const getInfoAboutCOVID = async (message) => {
    const separetedContent = message.content.split(' ');
    const country = separetedContent[1];
    const COVID = new Covid(country);
    COVID.sendMessageToChat();
};

module.exports.getInfoAboutCOVID = getInfoAboutCOVID;
