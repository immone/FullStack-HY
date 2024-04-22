const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('When the app is started with one user in database', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Mikko Mallikas',
        username: 'mmallikas',
        password: 'tosisalainen'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('then login form is shown', async ({ page }) => {

    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
  })

  describe('and login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mmallikas')
      await page.getByTestId('password').fill('tosisalainen')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Mikko Mallikas logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('ppitkatossu')
      await page.getByTestId('password').fill('vahansalainen')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })

  describe('When the user has logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('mmallikas')
      await page.getByTestId('password').fill('tosisalainen')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Mikko Mallikas logged in')).toBeVisible()
    })
  
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()

      await page.getByTestId('title').fill('test blog to be added')
      await page.getByTestId('author').fill('test author')
      await page.getByTestId('url').fill('https://test-blog.com')

      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText('Added a new blog: test blog to be added by test author')).toBeVisible()
    })
  })

  describe('When a new blog has been created', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('mmallikas')
      await page.getByTestId('password').fill('tosisalainen')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Mikko Mallikas logged in')).toBeVisible()

      await page.getByRole('button', { name: 'new blog' }).click()

      await page.getByTestId('title').fill('blog to be liked')
      await page.getByTestId('author').fill('test author')
      await page.getByTestId('url').fill('https://test-blog.com')

      await page.getByRole('button', { name: 'create' }).click()
    })

    test('it can be liked', async ({ page }) => {
      await page.goto('http://localhost:5173')
      
      await page.getByRole('button', { name: 'view' }).first().click()

      await expect(page.getByText('likes: 0')).toBeVisible()

      await page.getByRole('button', { name: 'like' }).first().click()

      await page.goto('http://localhost:5173')

      await page.getByRole('button', { name: 'view' }).first().click()
      
      await expect(page.getByText('likes: 1')).toBeVisible()
    })

    test('it can be be deleted', async ({ page }) => {
      await page.goto('http://localhost:5173')

      await expect(page.getByText('blog to be liked test author').first()).toBeVisible()

      await page.getByRole('button', { name: 'view' }).first().click()

      page.on('confirm', dialog => dialog.accept());
      
      await page.getByRole('button', { name: 'remove' }).first().click()

      await page.goto('http://localhost:5173')

      await expect(page.getByText('blog to be liked test author')).not.toBeVisible()
    })

    test('the remove button is not visible for other users', async ({ page, request }) => {
      await page.getByRole('button', { name: 'logout' }).first().click()
      
      await page.goto('http://localhost:5173')
  
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Peppi Pitkatossu',
          username: 'ppitkatossu',
          password: 'vahansalainen'
        }
      })
  
      await page.getByTestId('username').fill('ppitkatossu')
      await page.getByTestId('password').fill('vahansalainen')
      await page.getByRole('button', { name: 'login' }).click()
  
      await expect(page.getByText('Peppi Pitkatossu logged in')).toBeVisible()
      await expect(page.getByText('blog to be liked test author').first()).toBeVisible()
  
      await page.getByRole('button', { name: 'view' }).first().click()
  
      await expect(page.getByText('remove')).not.toBeVisible()
    })

    test.only('blogs are sorted by likes', async ({ page }) => {
      await page.getByTestId('title').fill('actual blog to be liked')
      await page.getByTestId('author').fill('test author two')
      await page.getByTestId('url').fill('https://test-blog-two.com')

      await page.getByRole('button', { name: 'create' }).click()

      //await expect(page.getByText('Added a new blog: actual blog to be likedadded by test author two')).toBeVisible()
      
      // Second blog has been added - refresh and check that it is last in the blog list
      await page.goto('http://localhost:5173')

      await page.waitForTimeout(500);
      
      await expect(page.getByText('blog to be liked test author').first()).toHaveText('blog to be liked test authorview')
      // like second blog
      await page.getByRole('button', { name: 'view' }).last().click()
      await page.getByRole('button', { name: 'like' }).last().click()

      // refresh
      await page.goto('http://localhost:5173')

      await page.waitForTimeout(500);
    
      // see if order has changed
      await expect(page.getByText('blog to be liked test author two').first()).toHaveText('actual blog to be liked test author twoview')

    })
  })

  
})

