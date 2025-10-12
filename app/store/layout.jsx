import StoreLayout from "@/components/store/StoreLayout";
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";

export const metadata = {
    title: "BuyNest. - Store Dashboard",
    description: "BuyNest. - Store Dashboard",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <SignedIn>
                <StoreLayout>
                    {children}
                </StoreLayout>
            </SignedIn>

            <SignedOut>
                <div className="flex justify-center items-center min-h-screen">
                    <SignIn fallbackRedirectUrl="/store" routing="hash" />
                </div>
            </SignedOut>
        </>
    );
}
