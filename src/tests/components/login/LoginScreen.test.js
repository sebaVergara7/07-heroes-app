import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));



describe('Pruebas en LoginScreen.test.js', () => {
    
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged:false,
        }
    };

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue } >
            <MemoryRouter initialEntries={ ['/login']}>
                <Routes>
                    <Route path="/login" element={ <LoginScreen /> } />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    )

    test('debe de mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();

    });

    test('debe de hacer el dispatch y la navegación', () => {

        const action = {
            type: types.login,
            payload: { name: 'Sebastián' }    
        }

        const handleClick = wrapper.find('button').prop('onClick');

        handleClick();
        expect( contextValue.dispatch ).toHaveBeenCalled();
        expect( contextValue.dispatch ).toHaveBeenCalledWith(action);
        expect( mockNavigate ).toHaveBeenCalled();
        expect( mockNavigate ).toHaveBeenCalledWith('/', { replace: true });

        localStorage.setItem('lastPath', '/marvel');
        
        handleClick();
        expect( mockNavigate ).toHaveBeenCalled();
        expect( mockNavigate ).toHaveBeenCalledWith('/marvel', { replace: true });

    });

});