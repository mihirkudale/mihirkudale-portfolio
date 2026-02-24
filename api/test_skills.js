import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const portfolio = require('./data/portfolio.json');

const compressed = portfolio.skills.map(c => ({
    category: c.title,
    skills: c.skills.map(s => s.name).join(', ')
}));

console.log(JSON.stringify(compressed, null, 2));
