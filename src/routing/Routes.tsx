import { Navigate, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import MainLoading from "../components/global/main-loading";

const Login = lazy(() => import('../pages/login'))
const Posts = lazy(() => import('../pages/posts'))
const AppLayout = lazy(() => import('../components/global/AppLayout'))
const AboutUs = lazy(() => import('../pages/about-us'))
const ContactUs = lazy(() => import('../pages/contact-us'))
const Home = lazy(() => import('../pages/home'))
const NotFound = lazy(() => import('../pages/not-found'))
const CreatPost = lazy(() => import('../pages/posts/components/CreatPost'))
const PostDetails = lazy(() => import('../pages/posts/components/Details'))
const Profile = lazy(() => import('../pages/profile'))
const Todos = lazy(() => import('../pages/todo-list'))
const TestContext = lazy(() => import('../pages/test-context'))
const DropDrilling = lazy(() => import('../pages/drop-drilling'))
const Cart = lazy(() => import('../pages/cart'))
const Shop = lazy(() => import('../pages/shop/shop'))
const RecoverPass = lazy(() => import('../pages/recover-pass'))

const AppRoutes = () => {
    return (
        <Suspense fallback={<MainLoading/>}>

        <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/recover-password" element={<RecoverPass />} />
            <Route path="/" element={<Navigate to='/app/home' />} />
            <Route path="/app" element={<Navigate to='/app/home' />} />

            <Route path="/app" element={<AppLayout />}>
                <Route path="home" element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="cart" element={<Cart />} />
                <Route path="profile" element={<Profile />} />
                <Route path="about-us" element={<AboutUs />} />
                <Route path="contact-us" element={<ContactUs />} />
                <Route path="todo-list" element={<Todos />} />
                <Route path="posts" element={<Posts />} />
                <Route path="creatpost" element={<CreatPost />} />
                <Route path="posts/:postId" element={<PostDetails />} />
                <Route path="drop-drilling" element={<DropDrilling />} />
                <Route path="test-context" element={<TestContext />} />
            </Route>


            <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
    )
}

export default AppRoutes