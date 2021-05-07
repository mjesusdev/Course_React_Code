import cloudinary from 'cloudinary';

import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({ 
    cloud_name: 'sample', 
    api_key: '973822616917977', 
    api_secret: 'wvcp_V_WkhV6_yIsW-ZQekFPws8' 
});

describe('Tests in fileUpload', () => {
    
    test('should upload file and return the URL', async( done ) => {
        
        const resp = await fetch('https://bit.ly/3tsEA04');
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');
        const url  = await fileUpload( file );

        expect( typeof url ).toBe('String');

        // Delete Image by ID
        const segments = url.split('/');
        const imageId = segments[ segments.length -1 ].replace('.jpg', '');

        cloudinary.v2.api.delete_resources( imageId, {}, () => {
            done();
        });

    });

    test('should return error', async() => {
    
        const file = new File([], 'foto.png');
        const url  = await fileUpload( file );

        expect( typeof url ).toBe( null );

    });
});