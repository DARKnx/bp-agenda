export interface UserSignIn {
    password: string;
    email: string;
}

export interface UserSignUp  extends UserSignIn {
    name: string;
    role: 'cliente' | 'admin' | 'corretor';
}