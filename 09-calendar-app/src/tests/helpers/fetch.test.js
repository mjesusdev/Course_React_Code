import { fetchWithToken, fetchWitoutToken } from "../../helpers/fetch";

describe('Test in helper Fetch', () => {
    
    let token = '';

    test('fetchWitOutToken should run', async () => {

        const resp = await fetchWitoutToken('auth', { email: 'hola@jesus.com', password: '123456789'}, 'POST');

        expect( resp instanceof Response ).toBe(true);

        const body = await resp.json();
        expect( body.ok ).toBe(true);

        token = body.token;

    })

    test('fetchWitOutToken should run', async () => {

        localStorage.setItem('token', token);

        const resp = await fetchWithToken('events/60c3285248248e3ec494382ab', {}, 'DELETE');
        const body = await resp.json();

        expect( body.msg ).toBe('Speak with the Administrator, please!');

    })
    
})
