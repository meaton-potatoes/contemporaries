const COUNTRIES = {
  'Israel': {
  	continent: 'Asia'
  },
  'Greece': {
  	continent: 'Europe'
  },
  'Italy': {
  	continent: 'Europe'
  },
  'China': {
  	continent: 'Asia'
  },
  'Saudi Arabia': {
  	continent: 'Asia'
  },
  'Austria': {
  	continent: 'Europe'
  },
  'Belgium': {
  	continent: 'Europe'
  },
  'United Kingdom': {
  	continent: 'Europe'
  },
  'France': {
  	continent: 'Europe'
  },
  'Germany': {
  	continent: 'Europe'
  },
  'Nepal': {
  	continent: 'Asia'
  },
  'Egypt': {
  	continent: 'Africa'
  },
  'Turkey': {
  	continent: 'Asia'
  },
  'Algeria': {
  	continent: 'Africa'
  },
  'Netherlands': {
  	continent: 'Europe'
  },
  'Mongolia': {
  	continent: 'Asia'
  },
  'Afghanistan': {
  	continent: 'Asia'
  },
  'Tunisia': {
  	continent: 'Africa'
  },
  'Prussia': {
  	continent: 'Europe'
  },
  'Czech Republic': {
  	continent: 'Europe'
  },
  'Spain': {
  	continent: 'Europe'
  },
  'Unknown': {},
  'Hungary': {
  	continent: 'Europe'
  },
  'Argentina': {
  	continent: 'South America'
  },
  'Switzerland': {
  	continent: 'Europe'
  },
  'India': {
  	continent: 'Asia'
  },
  'Iraq': {
  	continent: 'Asia'
  },
  'Portugal': {
  	continent: 'Europe'
  },
  'Georgia': {
  	continent: 'Asia'
  },
  'Russia': {
  	continent: 'Asia'
  },
  'Uzbekistan': {
  	continent: 'Asia'
  },
  'United States': {
  	continent: 'North America'
  },
  'Serbia': {
  	continent: 'Europe'
  },
  'Iran': {
  	continent: 'Asia'
  },
  'Ireland': {
  	continent: 'Europe'
  },
  'Croatia': {
  	continent: 'Europe'
  },
  'Libya': {
  	continent: 'Africa'
  },
  'Poland': {
  	continent: 'Europe'
  },
  'Republic Of Macedonia': {
  	continent: 'Europe'
  },
  'Bulgaria': {
  	continent: 'Europe'
  },
  'Sweden': {
  	continent: 'Europe'
  },
  'Jamaica': {
  	continent: 'North America'
  },
  'Cuba': {
  	continent: 'North America'
  },
  'Denmark': {
  	continent: 'Europe'
  },
  'Mexico': {
  	continent: 'North America'
  },
  'Colombia': {
  	continent: 'South America'
  },
  'Romania': {
  	continent: 'Europe'
  },
  'Brazil': {
  	continent: 'South America'
  },
  'Palestine': {
  	continent: 'Asia'
  },
  'Norway': {
  	continent: 'Europe'
  },
  'Japan': {
  	continent: 'Asia'
  },
  'Ukraine': {
  	continent: 'Europe'
  },
  'Chile': {
  	continent: 'South America'
  },
  'Venezuela': {
  	continent: 'South America'
  },
  'South Africa': {
  	continent: 'Africa'
  },
  'Kosovo': {
  	continent: 'Europe'
  },
  'Cyprus': {
  	continent: 'Europe'
  },
  'New Zealand': {
  	continent: 'Australia'
  },
  'Tajikistan': {
  	continent: 'Asia'
  },
  'Cambodia': {
  	continent: 'Asia'
  },
  'Iceland': {
  	continent: 'Europe'
  },
  'Kazakhstan': {
  	continent: 'Asia'
  },
  'Lebanon': {
  	continent: 'Europe'
  },
  'Tanzania': {
  	continent: 'Africa'
  },
  'Vietnam': {
  	continent: 'Asia'
  },
  'Finland': {
  	continent: 'Europe'
  },
  'Syria': {
  	continent: 'Asia'
  },
  'Morocco': {
  	continent: 'Africa'
  },
  'Ghana': {
  	continent: 'Africa'
  },
  'Albania': {
  	continent: 'Europe'
  },
  'Us Virgin Islands': {
  	continent: 'North America'
  },
  'Canada': {
  	continent: 'North America'
  },
  'Uganda': {
  	continent: 'Africa'
  },
  'Lithuania': {
  	continent: 'Europe'
  },
  'Ecuador': {
  	continent: 'South America'
  },
  'Bosnia And Herzegovina': {
  	continent: 'Europe'
  },
  'Kenya': {
  	continent: 'Africa'
  },
  'Latvia': {
  	continent: 'Europe'
  },
  'Belarus': {
  	continent: 'Europe'
  },
  'Peru': {
  	continent: 'South America'
  },
  'Indonesia': {
  	continent: 'Asia'
  },
  'Luxembourg': {
  	continent: 'Europe'
  },
  'North Korea': {
  	continent: 'Asia'
  },
  'Bangladesh': {
  	continent: 'Asia'
  },
  'Ethiopia': {
  	continent: 'Africa'
  },
  'Azerbaijan': {
  	continent: 'Asia'
  },
  'Armenia': {
  	continent: 'Europe'
  },
  'Madagascar': {
  	continent: 'Africa'
  },
  'Myanmar [Burma]': {
  	continent: 'Asia'
  },
  'Estonia': {
  	continent: 'Europe'
  },
  'Slovenia': {
  	continent: 'Europe'
  },
  'Slovakia': {
  	continent: 'Europe'
  },
  'South Korea': {
  	continent: 'Asia'
  },
  'Zimbabwe': {
  	continent: 'Africa'
  },
  'Guatemala': {
  	continent: 'South America'
  },
  'Mozambique': {
  	continent: 'Africa'
  },
  'Turkmenistan': {
  	continent: 'Asia'
  },
  'Australia': {
  	continent: 'Australia'
  },
  'Nicaragua': {
  	continent: 'South America'
  },
  'Democratic Republic Of Congo': {
  	continent: 'Africa'
  },
  'The Netherlands': {
  	continent: 'Europe'
  },
  'Central African Republic': {
  	continent: 'Africa'
  },
  'Senegal': {
  	continent: 'Africa'
  },
  'Philippines': {
  	continent: 'Asia'
  },
  'Paraguay': {
  	continent: 'South America'
  },
  'Uruguay': {
  	continent: 'South America'
  },
  'Dominican Republic': {
  	continent: 'North America'
  },
  'Thailand': {
  	continent: 'Asia'
  },
  'Monaco': {
  	continent: 'Europe'
  },
  'Saint Kitts And Nevis': {
  	continent: 'North America'
  },
  'Jordan': {
  	continent: 'Asia'
  },
  'Kyrgyzstan': {
  	continent: 'Asia'
  },
  'Costa Rica': {
  	continent: 'South America'
  },
  'Singapore': {
  	continent: 'Asia'
  },
  'Saint Lucia': {
  	continent: 'North America'
  },
  'Panama': {
  	continent: 'South America'
  },
  'Brunei Darussalam': {
  	continent: 'Asia'
  },
  'Montenegro': {
  	continent: 'Europe'
  },
  'Angola': {
  	continent: 'Africa'
  },
  'Trinidad And Tobago': {
  	continent: 'North America'
  },
  'Nigeria': {
  	continent: 'Africa'
  },
  'Sudan': {
  	continent: 'Africa'
  },
  'Pakistan': {
  	continent: 'Asia'
  },
  'Malaysia': {
  	continent: 'Asia'
  },
  'Cape Verde': {
  	continent: 'Africa'
  },
  'El Salvador': {
  	continent: 'South America'
  },
  'United Arab Emirates': {
  	continent: 'Asia'
  },
  'Bolivia': {
  	continent: 'South America'
  },
  'Congo': {
  	continent: 'Africa'
  },
  'Moldova': {
  	continent: 'Europe'
  },
  'Somalia': {
  	continent: 'Africa'
  },
  'Equatorial Guinea': {
  	continent: 'Africa'
  },
  'Laos': {
  	continent: 'Asia'
  },
  'Liberia': {
  	continent: 'Africa'
  },
  'Cameroon': {
  	continent: 'Africa'
  },
  'Guinea': {
  	continent: 'Africa'
  },
  'Kuwait': {
  	continent: 'Asia'
  },
  'Haiti': {
  	continent: 'North America'
  },
  'Yemen': {
  	continent: 'Asia'
  },
  'Guinea-Bissau': {
  	continent: 'Africa'
  },
  'Hong Kong': {
  	continent: 'Asia'
  },
  'Benin': {
  	continent: 'Africa'
  },
  'Ivory Coast': {
  	continent: 'Africa'
  },
  'Sri Lanka': {
  	continent: 'Asia'
  },
  'Suriname': {
  	continent: 'South America'
  },
  'Mali': {
  	continent: 'Africa'
  },
  'Malawi': {
  	continent: 'Africa'
  },
  'Rwanda': {
  	continent: 'Africa'
  },
  'Taiwan': {
  	continent: 'Asia'
  },
  'Burkina Faso': {
  	continent: 'Africa'
  },
  'Togo': {
  	continent: 'Africa'
  },
  'Timor-Leste': {
  	continent: 'Asia'
  },
  'Namibia': {
  	continent: 'Africa'
  },
  'Sao Tome And Principe': {
  	continent: ''
  },
  'Zambia': {
  	continent: ''
  },
  'Libyan Arab Jamahiriya': {
  	continent: ''
  },
  'Botswana': {
  	continent: ''
  },
  'Chad': {
  	continent: ''
  },
  'Eritrea': {
  	continent: ''
  },
  'Malta': {
  	continent: ''
  },
  'Isle Of Man': {
  	continent: ''
  },
  'Qatar': {
  	continent: ''
  },
  'Seychelles': {
  	continent: ''
  },
  'Mauritius': {
  	continent: ''
  },
  'Tonga': {
  	continent: ''
  },
  'Micronesia': {
  	continent: ''
  },
  'Bahrain': {
  	continent: ''
  },
  'Antigua And Barbuda': {
  	continent: ''
  },
  'Aruba': {
  	continent: ''
  },
  'Puerto Rico': {
  	continent: ''
  },
  'Samoa': {
  	continent: ''
  },
  'Maldives': {
  	continent: ''
  },
  'Barbados': {
  	continent: ''
  },
  'Bhutan': {
  	continent: ''
  },
  'South Sudan': {
  	continent: ''
  },
  'Honduras': {
  	continent: ''
  },
  'São Tomé And Príncipe': {
  	continent: ''
  },
  'Lesotho': {
  	continent: ''
  },
  'Kiribati': {
  	continent: ''
  },
  'Vanuatu': {
  	continent: ''
  },
  'Mauritania': {
  	continent: ''
  },
  'Burundi': {
  	continent: ''
  },
  'Djibouti': {
  	continent: ''
  },
  'Sierra Leone': {
  	continent: ''
  },
  'Swaziland': {
  	continent: ''
  },
  'Gibraltar': {
  	continent: ''
  },
  'New Caledonia': {
  	continent: ''
  },
  'Bermuda': {
  	continent: ''
  },
  'Guyana': {
  	continent: ''
  },
  'Gambia': {
  	continent: ''
  },
  'Andorra': {
  	continent: ''
  },
  'Greenland': {
  	continent: ''
  },
  'Oman': {
  	continent: ''
  },
  'Nauru': {
  	continent: ''
  },
  'Liechtenstein': {
  	continent: ''
  },
  'Jersey'
}
