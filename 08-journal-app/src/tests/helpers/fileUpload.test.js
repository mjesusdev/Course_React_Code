import cloudinary from 'cloudinary';

import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({ 
    cloud_name: 'dp4de4p3l', 
    api_key: '973822616917977', 
    api_secret: 'wvcp_V_WkhV6_yIsW-ZQekFPws8' 
});

describe('Tests in fileUpload', () => {
    test('should upload file and return the URL', async() => {
        const resp = await fetch('https://3.bp.blogspot.com/-Ro38IIzgYl4/WqmEbiJt6_I/AAAAAAAB0xc/M0DlGHhC5ccFvWrzf_KxWineteYrtl6qwCK4BGAYYCw/s1600/imagenes-paisajes-hermosos-ayadamaldivesresort-maldivas-playa-arena.jpg');
        const blob = await resp.blob();

        const file = new File([blob], 'foto.jpg');
        const url  = await fileUpload( file );

        expect( typeof url ).toBe('string');

        // Delete Image by ID
        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '');

        await cloudinary.v2.api.delete_resources( imageId );
    });

    test('should return error', async() => {
        const file = new File([], 'foto.jpg');
        const url  = await fileUpload( file );

        expect( url ).toBe( null );
    });
});