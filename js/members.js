// ========================================
// MEMBER DATA — mapped by nickname (filename)
// ========================================
const MEMBERS = [
    {
        nickname: 'pannu shravan',
        realName: 'Shravan',
        about: 'High-energy guy with unlimited excitement and zero chill.\nLeadership + craziness combo pack.',
        role: 'Captain (leads first, plucks later)',
        hobbies: 'Games, crazyness, anime,Hentai,jav',
        personality: 'Energetic, fun-loving, naturally commanding',
        quote: 'East or west jav is the best'
    },
    {
        nickname: 'Dilse Nandan',
        realName: 'Nandan',
        about: 'Lives life on easy mode. Stress avoids him.\nLoved a girl dev but she loved his dad.',
        role: 'Mood Booster (Unofficial)',
        hobbies: 'Everything except studying',
        personality: 'Happy-go-lucky, chill, carefree',
        quote: 'Dilse tarikida tom'
    },
    {
        nickname: 'Marthandam Batman',
        realName: 'Aggai Jude',
        about: 'Two modes only: technical genius and pure madness.',
        role: 'Tech Brain + Idea Generator',
        hobbies: 'Learning new things, technical experiments, crazy ideas',
        personality: 'Happy outside, tensed inside',
        quote: 'Once life will fuck us or we will fuck life'
    },
    {
        nickname: 'Peacemaker',
        realName: 'Roshen',
        about: 'Calm guy who solves problems by saying "bro chill".',
        role: 'Peacemaker',
        hobbies: 'Everything, technical stuff, gaming, anime, etc etc',
        personality: 'Chill guy with gaming skill',
        quote: 'Always peace'
    },
    {
        nickname: 'Unknown',
        realName: 'Arnav',
        about: 'Appears silently. Leaves mysteriously.',
        role: 'Unknown',
        hobbies: 'Unknown',
        personality: 'Unknown',
        quote: 'Unknown'
    },
    {
        nickname: 'Pluck gopal',
        realName: 'Siva Gopal',
        about: 'Gives motivation to everyone except himself.\nPlucking is a full-time job.',
        role: 'PP (meaning classified)',
        hobbies: 'Anime, FPS games, plucking',
        personality: 'Friendly, motivational (not for him), always plucking',
        quote: 'Plucking is more important'
    },
    {
        nickname: 'Epstein Shaji',
        realName: 'Daniel Shaji',
        about: 'Always online. Always typing. Always suspicious.',
        role: 'Hacker, Developer',
        hobbies: 'Exploring internet, breaking software accidentally',
        personality: 'Calm, mysterious, encrypted mindset',
        quote: 'FUCK THE NIGGERS'
    },
    {
        nickname: 'BabyYaga',
        realName: 'Absalom',
        about: 'Silent gamer. Deadly in Mini Militia.',
        role: 'John Wick of Mini Militia',
        hobbies: 'PES, Mini Militia',
        personality: 'Like John Wick – quiet and dangerous',
        quote: 'GOD IS GREAT'
    },
    {
        nickname: 'CP dennis',
        realName: 'Dennis',
        about: 'Happy soul with tank build and golden heart.',
        role: 'Chubby Guy',
        hobbies: 'Sworn brother to Daniel,cp partner',
        personality: 'Always happy, positive vibes only',
        quote: 'bro come bro'
    },
    {
        nickname: 'kundan bejoy',
        realName: 'Bejo Das',
        about: 'Muscle outside, madness inside.',
        role: 'Gym Bro / Gymn',
        hobbies: 'Mini Militia, PES, Gym',
        personality: 'Muscle guy with 100% crazyness',
        quote: 'One more rep… then game.'
    }
];

// Get member by nickname
function getMemberByNickname(nickname) {
    return MEMBERS.find(m => m.nickname.toLowerCase() === nickname.toLowerCase());
}

// Get image path for a member based on selected path color
function getMemberImagePath(nickname, color) {
    const folder = color === 'blue' ? 'images/blue-tablet' : 'images/red-tablet';
    const formattedName = nickname.toLowerCase().replace(/\s+/g, '-');
    return `${folder}/${formattedName}.png`;
}
