describe('devtools', () => {
    it('should allow use puppeteer instance', async () => {
        await browser.url('https://webdriver.io');
        const puppeteerBrowser = await browser.getPuppeteer();
        const pages = await puppeteerBrowser.pages();
        const metrics = await pages[0].metrics()
        console.log(metrics)
    });

    it('should allow use mock feature', async () => {
        const mock = await browser.mock('https://todo-backend-spring4-java8.herokuapp.com/todos/', {
            method: 'get'
        })
        await mock.respond([{
            title: 'Todo 1',
            order: null,
            completed: false
        }, {
            title: 'Todo 2',
            order: null,
            completed: true
        }])

        await browser.url('https://todobackend.com/client/index.html?https://todo-backend-spring4-java8.herokuapp.com/todos/')

        await expect(mock).toBeRequestedTimes(1)
        const todoList = await $('#todo-list li');
        await todoList.waitForExist()
        await expect($$('#todo-list li')).toBeElementsArrayOfSize(2);
    });
});

