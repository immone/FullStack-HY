const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithThreeBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa134r324a676232597435dgbdj',
      title: 'Collected Works (Collected Works of Kurt Godel)',
      author: 'Kurt Gödel',
      url: 'https://www.amazon.com/Collected-Works-Unpublished-essays-lectures/dp/0195072553/ref=sr_1_1?dib=eyJ2IjoiMSJ9.c4BLuyAV89nteXckJA8xKJQVpSDNDHjWb3gRQ_6MYlwVP1YBnwf4Z-lWQ21LypAEs0whf44lk21-Ge4gm72dcekCZr-LteUE7BId44TOC3VMbQMdX-yAqD3J1Ws3nqVcCXvm4HuHYAtf64NWZWzxv6zBifNEIGvKfy9L5yTv6X5nkNV6muEbNxUVNC-XZ6ZbvS_9NxBrV1yZF9K15fpCyfGeUQqzNxS2vRyO-9HYiSY.t5YDQUMl9JC6OmvwYGxmN6YOaUG6i-pPvH_aNCVCxGQ&dib_tag=se&qid=1712143290&refinements=p_27%3AKurt+Godel&s=books&sr=1-1',
      likes: 30,
      __v: 0
    },
    {
      _id: '5a422aafdbjfa54a67622485djvbsnafb',
      title: 'Introduction to Logic: And to the Methodology of Deductive Sciences',
      author: 'Alred Tarski',
      url: 'https://www.amazon.com/Introduction-Logic-Methodology-Deductive-Mathematics/dp/048628462X/ref=sr_1_1?crid=3F9SQFAAM8N53&dib=eyJ2IjoiMSJ9.Go_LbUO87o6aj9MjZHbI8jkPrG3-B-fFHwuuqjoL7ndWbQSfCc1-a5ajlAvjVUy2Wu_kRznstQXJ83KJDRGGsCJypclVx4TvB3yUEt-XfaCWHlQgozpoKvUxUXzvdOzWCjdWwZPlGmLf1KPmAqSzP1u9DI6wIWDS4NbdF6XKgri1W7uO_twf5eraUNWRjPqqlhelhXi_hoqqQm6lcMeUsGzxrTeW4NyYk-vUFIaXRuA.QDiKmEy4NlFvCmj2FvHdEuFv0LD31oJoxBkoVpJJKtU&dib_tag=se&keywords=tarski&qid=1712143333&s=books&sprefix=tars%2Cstripbooks-intl-ship%2C186&sr=1-1',
      likes: 12,
      __v: 0
    },
    
  ]

  const listWithNoBlogs = []

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
  test('when list has multiple blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithThreeBlogs)
    assert.strictEqual(result, 47)
  })
  test('when list has no blogs equals zero', () => {
    const result = listHelper.totalLikes(listWithNoBlogs)
    assert.strictEqual(result, 0)
  })
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithThreeBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa134r324a676232597435dgbdj',
      title: 'Collected Works (Collected Works of Kurt Godel)',
      author: 'Kurt Gödel',
      url: 'https://www.amazon.com/Collected-Works-Unpublished-essays-lectures/dp/0195072553/ref=sr_1_1?dib=eyJ2IjoiMSJ9.c4BLuyAV89nteXckJA8xKJQVpSDNDHjWb3gRQ_6MYlwVP1YBnwf4Z-lWQ21LypAEs0whf44lk21-Ge4gm72dcekCZr-LteUE7BId44TOC3VMbQMdX-yAqD3J1Ws3nqVcCXvm4HuHYAtf64NWZWzxv6zBifNEIGvKfy9L5yTv6X5nkNV6muEbNxUVNC-XZ6ZbvS_9NxBrV1yZF9K15fpCyfGeUQqzNxS2vRyO-9HYiSY.t5YDQUMl9JC6OmvwYGxmN6YOaUG6i-pPvH_aNCVCxGQ&dib_tag=se&qid=1712143290&refinements=p_27%3AKurt+Godel&s=books&sr=1-1',
      likes: 30,
      __v: 0
    },
    {
      _id: '5a422aafdbjfa54a67622485djvbsnafb',
      title: 'Introduction to Logic: And to the Methodology of Deductive Sciences',
      author: 'Alred Tarski',
      url: 'https://www.amazon.com/Introduction-Logic-Methodology-Deductive-Mathematics/dp/048628462X/ref=sr_1_1?crid=3F9SQFAAM8N53&dib=eyJ2IjoiMSJ9.Go_LbUO87o6aj9MjZHbI8jkPrG3-B-fFHwuuqjoL7ndWbQSfCc1-a5ajlAvjVUy2Wu_kRznstQXJ83KJDRGGsCJypclVx4TvB3yUEt-XfaCWHlQgozpoKvUxUXzvdOzWCjdWwZPlGmLf1KPmAqSzP1u9DI6wIWDS4NbdF6XKgri1W7uO_twf5eraUNWRjPqqlhelhXi_hoqqQm6lcMeUsGzxrTeW4NyYk-vUFIaXRuA.QDiKmEy4NlFvCmj2FvHdEuFv0LD31oJoxBkoVpJJKtU&dib_tag=se&keywords=tarski&qid=1712143333&s=books&sprefix=tars%2Cstripbooks-intl-ship%2C186&sr=1-1',
      likes: 12,
      __v: 0
    },
    
  ]

  const listWithNoBlogs = []

  test('when list has only one blog equals that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.strictEqual(result, listWithOneBlog[0])
  })
  test('when list has multiple blog equals the one with most likes', () => {
    const result = listHelper.favoriteBlog(listWithThreeBlogs)
    assert.strictEqual(result, listWithThreeBlogs[1])
  })
  test('when list has no blogs equals null', () => {
    const result = listHelper.favoriteBlog(listWithNoBlogs)
    assert.strictEqual(result, null)
  })
})

describe('total releases', () => { 
  const listWithSixBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8safsa',
      title: 'A Discipline of Programming (Prentice-Hall Series in Automatic Computation)',
      author: 'Edsger W. Dijkstra',
      url: 'https://www.amazon.com/Discipline-Programming-Prentice-Hall-Computation-1976-03-03/dp/0613924118/ref=sr_1_1?crid=2MCSSTXBPS3II&dib=eyJ2IjoiMSJ9.L48u4KMLEvLVbTCLFTmQBoPoDBPt2HYejboGOjAU0TFX2Aapleovt0AY-qJ6-5snH4p91dhwvdlrHOAvs2Wl6_MiSjQPTTtGaxo73aHul1oikLIlqSnX_85yfXIWRXvoHXJPIPw9YJe0dzG7cAD2rKVS_xNJc5Zdek1VC7iKtsJO013M3wsUNOHilRnWIq16nv16vztNpqKo8-P9ht-2T-uemKiERVfztecmiR32tII.8JIUX5l-tAeBNjfI1fVGxtV-VFgK8rY-MShx_2FmUJg&dib_tag=se&keywords=Dijkstra&qid=1712144692&sprefix=dijkstr%2Caps%2C152&sr=8-1',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa134r324a676232597435dgbdj',
      title: 'Collected Works (Collected Works of Kurt Godel)',
      author: 'Kurt Gödel',
      url: 'https://www.amazon.com/Collected-Works-Unpublished-essays-lectures/dp/0195072553/ref=sr_1_1?dib=eyJ2IjoiMSJ9.c4BLuyAV89nteXckJA8xKJQVpSDNDHjWb3gRQ_6MYlwVP1YBnwf4Z-lWQ21LypAEs0whf44lk21-Ge4gm72dcekCZr-LteUE7BId44TOC3VMbQMdX-yAqD3J1Ws3nqVcCXvm4HuHYAtf64NWZWzxv6zBifNEIGvKfy9L5yTv6X5nkNV6muEbNxUVNC-XZ6ZbvS_9NxBrV1yZF9K15fpCyfGeUQqzNxS2vRyO-9HYiSY.t5YDQUMl9JC6OmvwYGxmN6YOaUG6i-pPvH_aNCVCxGQ&dib_tag=se&qid=1712143290&refinements=p_27%3AKurt+Godel&s=books&sr=1-1',
      likes: 30,
      __v: 0
    },
    {
      _id: '5a422aafdbjfa54a67622485djvbsnafb',
      title: 'Introduction to Logic: And to the Methodology of Deductive Sciences',
      author: 'Alred Tarski',
      url: 'https://www.amazon.com/Introduction-Logic-Methodology-Deductive-Mathematics/dp/048628462X/ref=sr_1_1?crid=3F9SQFAAM8N53&dib=eyJ2IjoiMSJ9.Go_LbUO87o6aj9MjZHbI8jkPrG3-B-fFHwuuqjoL7ndWbQSfCc1-a5ajlAvjVUy2Wu_kRznstQXJ83KJDRGGsCJypclVx4TvB3yUEt-XfaCWHlQgozpoKvUxUXzvdOzWCjdWwZPlGmLf1KPmAqSzP1u9DI6wIWDS4NbdF6XKgri1W7uO_twf5eraUNWRjPqqlhelhXi_hoqqQm6lcMeUsGzxrTeW4NyYk-vUFIaXRuA.QDiKmEy4NlFvCmj2FvHdEuFv0LD31oJoxBkoVpJJKtU&dib_tag=se&keywords=tarski&qid=1712143333&s=books&sprefix=tars%2Cstripbooks-intl-ship%2C186&sr=1-1',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422aa134r324andvsnfj32or34',
      title: 'On Formally Undecidable Propositions of Principia Mathematica and Related Systems',
      author: 'Kurt Gödel',
      url: 'https://www.amazon.com/Formally-Undecidable-Propositions-Principia-Mathematica/dp/1773237535/ref=sr_1_2?crid=13VRR43JBOH6F&dib=eyJ2IjoiMSJ9.ULocgro2ggoqHKRjDMUOf2YgxJwaL7hn2BTtumq-nvpaywnSm8bTgfkC1b8YKXX7y-z0UQ5SBvZm1cud3JEuTnzODQbP2ALbV6A5wd4GSS3jo-ltO6kZ81qNTQqTrUmGZj-evM9P8a1uqb1nLrEcxMatvsyi_k8tIu5ESg0rHpsciteLW5PuWGyAGaIbWfwTqVPMAAxktcDZ5qQrUA_E1bCZloGbu63UH5rk2UsbUyg.USnrmjUEWa-PM3ohB-gmMqa5WZfrC-37VfNNoJRrQps&dib_tag=se&keywords=kurt+gödel&qid=1712144752&sprefix=kurt+göd%2Caps%2C159&sr=8-2',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa134r324a676231123434242',
      title: 'Predicate Calculus and Program Semantics ',
      author: 'Edsger W. Dijkstra',
      url: 'https://www.amazon.com/Predicate-Calculus-Semantics-Monographs-Computer/dp/0387969578/ref=sr_1_5?crid=3HZ42W1HUDJQT&dib=eyJ2IjoiMSJ9.L48u4KMLEvLVbTCLFTmQBoPoDBPt2HYejboGOjAU0TFX2Aapleovt0AY-qJ6-5snH4p91dhwvdlrHOAvs2Wl6_MiSjQPTTtGaxo73aHul1oikLIlqSnX_85yfXIWRXvoHXJPIPw9YJe0dzG7cAD2rKVS_xNJc5Zdek1VC7iKtsJO013M3wsUNOHilRnWIq16nv16vztNpqKo8-P9ht-2T-uemKiERVfztecmiR32tII.8JIUX5l-tAeBNjfI1fVGxtV-VFgK8rY-MShx_2FmUJg&dib_tag=se&keywords=Dijkstra&qid=1712144792&sprefix=dijkstr%2Caps%2C157&sr=8-5',
      likes: 30,
      __v: 0
    }
  ]

    const listWithNoBlogs = []
    test('when list has six blogs equals author with three blogs', () => {
      const result = listHelper.mostBlogs(listWithSixBlogs)
      assert(result.author === 'Edsger W. Dijkstra' && result.blogs === 3)
    })

    test('when list has no blogs equals null', () => {
      const result = listHelper.favoriteBlog(listWithNoBlogs)
      assert.equal(result, null)
    })
    
})

describe('author with most likes', () => { 
  const listWithSixBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8safsa',
      title: 'A Discipline of Programming (Prentice-Hall Series in Automatic Computation)',
      author: 'Edsger W. Dijkstra',
      url: 'https://www.amazon.com/Discipline-Programming-Prentice-Hall-Computation-1976-03-03/dp/0613924118/ref=sr_1_1?crid=2MCSSTXBPS3II&dib=eyJ2IjoiMSJ9.L48u4KMLEvLVbTCLFTmQBoPoDBPt2HYejboGOjAU0TFX2Aapleovt0AY-qJ6-5snH4p91dhwvdlrHOAvs2Wl6_MiSjQPTTtGaxo73aHul1oikLIlqSnX_85yfXIWRXvoHXJPIPw9YJe0dzG7cAD2rKVS_xNJc5Zdek1VC7iKtsJO013M3wsUNOHilRnWIq16nv16vztNpqKo8-P9ht-2T-uemKiERVfztecmiR32tII.8JIUX5l-tAeBNjfI1fVGxtV-VFgK8rY-MShx_2FmUJg&dib_tag=se&keywords=Dijkstra&qid=1712144692&sprefix=dijkstr%2Caps%2C152&sr=8-1',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa134r324a676232597435dgbdj',
      title: 'Collected Works (Collected Works of Kurt Godel)',
      author: 'Kurt Gödel',
      url: 'https://www.amazon.com/Collected-Works-Unpublished-essays-lectures/dp/0195072553/ref=sr_1_1?dib=eyJ2IjoiMSJ9.c4BLuyAV89nteXckJA8xKJQVpSDNDHjWb3gRQ_6MYlwVP1YBnwf4Z-lWQ21LypAEs0whf44lk21-Ge4gm72dcekCZr-LteUE7BId44TOC3VMbQMdX-yAqD3J1Ws3nqVcCXvm4HuHYAtf64NWZWzxv6zBifNEIGvKfy9L5yTv6X5nkNV6muEbNxUVNC-XZ6ZbvS_9NxBrV1yZF9K15fpCyfGeUQqzNxS2vRyO-9HYiSY.t5YDQUMl9JC6OmvwYGxmN6YOaUG6i-pPvH_aNCVCxGQ&dib_tag=se&qid=1712143290&refinements=p_27%3AKurt+Godel&s=books&sr=1-1',
      likes: 30,
      __v: 0
    },
    {
      _id: '5a422aafdbjfa54a67622485djvbsnafb',
      title: 'Introduction to Logic: And to the Methodology of Deductive Sciences',
      author: 'Alred Tarski',
      url: 'https://www.amazon.com/Introduction-Logic-Methodology-Deductive-Mathematics/dp/048628462X/ref=sr_1_1?crid=3F9SQFAAM8N53&dib=eyJ2IjoiMSJ9.Go_LbUO87o6aj9MjZHbI8jkPrG3-B-fFHwuuqjoL7ndWbQSfCc1-a5ajlAvjVUy2Wu_kRznstQXJ83KJDRGGsCJypclVx4TvB3yUEt-XfaCWHlQgozpoKvUxUXzvdOzWCjdWwZPlGmLf1KPmAqSzP1u9DI6wIWDS4NbdF6XKgri1W7uO_twf5eraUNWRjPqqlhelhXi_hoqqQm6lcMeUsGzxrTeW4NyYk-vUFIaXRuA.QDiKmEy4NlFvCmj2FvHdEuFv0LD31oJoxBkoVpJJKtU&dib_tag=se&keywords=tarski&qid=1712143333&s=books&sprefix=tars%2Cstripbooks-intl-ship%2C186&sr=1-1',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422aa134r324andvsnfj32or34',
      title: 'On Formally Undecidable Propositions of Principia Mathematica and Related Systems',
      author: 'Kurt Gödel',
      url: 'https://www.amazon.com/Formally-Undecidable-Propositions-Principia-Mathematica/dp/1773237535/ref=sr_1_2?crid=13VRR43JBOH6F&dib=eyJ2IjoiMSJ9.ULocgro2ggoqHKRjDMUOf2YgxJwaL7hn2BTtumq-nvpaywnSm8bTgfkC1b8YKXX7y-z0UQ5SBvZm1cud3JEuTnzODQbP2ALbV6A5wd4GSS3jo-ltO6kZ81qNTQqTrUmGZj-evM9P8a1uqb1nLrEcxMatvsyi_k8tIu5ESg0rHpsciteLW5PuWGyAGaIbWfwTqVPMAAxktcDZ5qQrUA_E1bCZloGbu63UH5rk2UsbUyg.USnrmjUEWa-PM3ohB-gmMqa5WZfrC-37VfNNoJRrQps&dib_tag=se&keywords=kurt+gödel&qid=1712144752&sprefix=kurt+göd%2Caps%2C159&sr=8-2',
      likes: 15,
      __v: 0
    },
    {
      _id: '5a422aa134r324a676231123434242',
      title: 'Predicate Calculus and Program Semantics ',
      author: 'Edsger W. Dijkstra',
      url: 'https://www.amazon.com/Predicate-Calculus-Semantics-Monographs-Computer/dp/0387969578/ref=sr_1_5?crid=3HZ42W1HUDJQT&dib=eyJ2IjoiMSJ9.L48u4KMLEvLVbTCLFTmQBoPoDBPt2HYejboGOjAU0TFX2Aapleovt0AY-qJ6-5snH4p91dhwvdlrHOAvs2Wl6_MiSjQPTTtGaxo73aHul1oikLIlqSnX_85yfXIWRXvoHXJPIPw9YJe0dzG7cAD2rKVS_xNJc5Zdek1VC7iKtsJO013M3wsUNOHilRnWIq16nv16vztNpqKo8-P9ht-2T-uemKiERVfztecmiR32tII.8JIUX5l-tAeBNjfI1fVGxtV-VFgK8rY-MShx_2FmUJg&dib_tag=se&keywords=Dijkstra&qid=1712144792&sprefix=dijkstr%2Caps%2C157&sr=8-5',
      likes: 30,
      __v: 0
    }
  ]

    const listWithNoBlogs = []
    test('when list has six blogs equals author with most likes', () => {
      const result = listHelper.mostLikes(listWithSixBlogs)
      assert(result.author === 'Kurt Gödel' && result.likes === 45)
    })

    test('when list has no blogs equals null', () => {
      const result = listHelper.mostLikes(listWithNoBlogs)
      assert.equal(result, null)
    })
    
})