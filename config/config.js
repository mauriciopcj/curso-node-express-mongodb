const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
        return {
            bd_string: 'http://localhost:27017',
            jwt_pass: 'Senhaforte2019',
            jwt_exprires_in: '7d'
        }

        case 'hml':
        return {
            bd_string: 'http://localhost:27017',
            jwt_pass: 'Senhaforte2019',
            jwt_exprires_in: '7d'
        }
        
        case 'prod':
        return {
            bd_string: 'http://localhost:27017',
            jwt_pass: 'Senhamuitoforte2019',
            jwt_exprires_in: '7d'
        }
    }
}

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();