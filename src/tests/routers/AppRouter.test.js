import { mount } from "enzyme";
import { AuthContext } from "../../auth/authContext";
import { AppRouter } from "../../routers/AppRouter";

describe('Pruebas en AppRouter.test.js', () => {
  
    test('debe de mostrar el login si el usuario no está autenticado', () => {

        const contextValue = {
            user: { 
                logged: false,
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue } >
                <AppRouter />
            </AuthContext.Provider>
        );
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe('Login');

    });

    test('debe de mostrar el componente de Marvel si el usuario está autenticado', () => {

        const contextValue = {
            user: { 
                logged: true,
                name: 'Sebastián'
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue } >
                <AppRouter />
            </AuthContext.Provider>
        );
        
        // console.log( wrapper.html() );
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.navbar').exists() ).toBe( true );

    });

});