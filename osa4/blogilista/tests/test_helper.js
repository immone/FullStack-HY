const Blog = require('../models/blog')
const User = require('../models/user')

let initialBlogs = [
{
    title: 'Introduction to Logic: And to the Methodology of Deductive Sciences',
    author: 'Alred Tarski',
    url: 'https://www.amazon.com/Introduction-Logic-Methodology-Deductive-Mathematics/dp/048628462X/ref=sr_1_1?crid=3F9SQFAAM8N53&dib=eyJ2IjoiMSJ9.Go_LbUO87o6aj9MjZHbI8jkPrG3-B-fFHwuuqjoL7ndWbQSfCc1-a5ajlAvjVUy2Wu_kRznstQXJ83KJDRGGsCJypclVx4TvB3yUEt-XfaCWHlQgozpoKvUxUXzvdOzWCjdWwZPlGmLf1KPmAqSzP1u9DI6wIWDS4NbdF6XKgri1W7uO_twf5eraUNWRjPqqlhelhXi_hoqqQm6lcMeUsGzxrTeW4NyYk-vUFIaXRuA.QDiKmEy4NlFvCmj2FvHdEuFv0LD31oJoxBkoVpJJKtU&dib_tag=se&keywords=tarski&qid=1712143333&s=books&sprefix=tars%2Cstripbooks-intl-ship%2C186&sr=1-1',
    likes: 1
    },
    {
    title: 'On Formally Undecidable Propositions of Principia Mathematica and Related Systems',
    author: 'Kurt Gödel',
    url: 'https://www.amazon.com/Formally-Undecidable-Propositions-Principia-Mathematica/dp/1773237535/ref=sr_1_2?crid=13VRR43JBOH6F&dib=eyJ2IjoiMSJ9.ULocgro2ggoqHKRjDMUOf2YgxJwaL7hn2BTtumq-nvpaywnSm8bTgfkC1b8YKXX7y-z0UQ5SBvZm1cud3JEuTnzODQbP2ALbV6A5wd4GSS3jo-ltO6kZ81qNTQqTrUmGZj-evM9P8a1uqb1nLrEcxMatvsyi_k8tIu5ESg0rHpsciteLW5PuWGyAGaIbWfwTqVPMAAxktcDZ5qQrUA_E1bCZloGbu63UH5rk2UsbUyg.USnrmjUEWa-PM3ohB-gmMqa5WZfrC-37VfNNoJRrQps&dib_tag=se&keywords=kurt+gödel&qid=1712144752&sprefix=kurt+göd%2Caps%2C159&sr=8-2',
    likes: 10
    },
    {
    title: 'Predicate Calculus and Program Semantics ',
    author: 'Edsger W. Dijkstra',
    url: 'https://www.amazon.com/Predicate-Calculus-Semantics-Monographs-Computer/dp/0387969578/ref=sr_1_5?crid=3HZ42W1HUDJQT&dib=eyJ2IjoiMSJ9.L48u4KMLEvLVbTCLFTmQBoPoDBPt2HYejboGOjAU0TFX2Aapleovt0AY-qJ6-5snH4p91dhwvdlrHOAvs2Wl6_MiSjQPTTtGaxo73aHul1oikLIlqSnX_85yfXIWRXvoHXJPIPw9YJe0dzG7cAD2rKVS_xNJc5Zdek1VC7iKtsJO013M3wsUNOHilRnWIq16nv16vztNpqKo8-P9ht-2T-uemKiERVfztecmiR32tII.8JIUX5l-tAeBNjfI1fVGxtV-VFgK8rY-MShx_2FmUJg&dib_tag=se&keywords=Dijkstra&qid=1712144792&sprefix=dijkstr%2Caps%2C157&sr=8-5',
    likes: 30
    }
]


// Returns all blogs in the database
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

// Returns all users in the database
const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}