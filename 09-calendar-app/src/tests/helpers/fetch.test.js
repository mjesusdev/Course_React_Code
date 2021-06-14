import { fetchWitoutToken } from "../../helpers/fetch"

describe('Test in helper Fetch', () => {
    
    test('fetchWitOutToken should run', async () => {

        const resp = await fetchWitoutToken('auth', { email: 'hola@jesus.com', password: '123456789'}, 'POST');

        expect( resp instanceof Response ).toBe(true);

        const body = await resp.json();
        expect( body ).toBe(true);

    })
    
})
