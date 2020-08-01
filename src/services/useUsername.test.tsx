import testHook from '../utils/testing/testHook';
import { useUser, ProvideUser, User } from './useUsername';
import { act } from 'react-dom/test-utils';

let user: User;
beforeEach(() => {
    testHook(() => {
        user = useUser()
    }, ProvideUser)
})

describe("User Hook", () => {
    it("Should have username anonimo on start", () => {
        expect(user.username).toBe("anonimo")
    })

    it("Should redturn a different username after change", () => {
        act(() => {
            user.setUsername("peter")
        })
        expect(user.username).toBe("peter")
    })
})