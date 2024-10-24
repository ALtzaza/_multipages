const users = [
    {user: 'user', pass: 'pass', role: 'user', token: 'user'},
    {user: 'admin', pass: 'admin', role: 'admin', token: 'admin'},
    {user: 'guest', pass: 'guset', role: 'guset', token: 'guset'},
]

export function verifyUser(user,pass){
    
   const userFound = users.find((u) => {
        return u.user === user && u.pass === pass
    })
    return userFound ? { token: userFound.token, role: userFound.role} : null

 }