import { mount } from 'enzyme';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../../../auth/authContext';
import { Navbar } from '../../../components/ui/Navbar';
import { types } from '../../../types/types';

const dispatch = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Pruebas en Navbar.test.js', () => {

    const contextValue = {
        user: {
            name: 'Sebastián',
            logged: true,
        },
        dispatch
    }

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue } >
            <MemoryRouter initialEntries={ ['/']}>
                <Routes>
                    <Route path="/" element={<Navbar />} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    )

    test('debe de mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe('Sebastián');

    });

    test('debe de llamar al logout, llamar el navigate y el dispatch con los argumentos', () => {

        expect( wrapper.find('button').simulate('click') );
        expect( dispatch ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith({ type: types.logout });
        expect( mockNavigate ).toHaveBeenCalled();
        expect( mockNavigate ).toHaveBeenCalledWith('/login', { replace: true });
        
    });

});