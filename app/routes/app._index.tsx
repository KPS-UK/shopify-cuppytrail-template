import type {
  ActionFunctionArgs,
  HeadersFunction,
  LoaderFunctionArgs,
} from "react-router";
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
   await authenticate.admin(request);
  
  return null;
};

export default function Index() {
  return (
    <s-page heading="KPS Cuppy Trail">

      <s-section heading="Congrats on successfully setting up KPS Cuppy Trail 🎉">
        <s-paragraph>
          This app serves as a founcdation for building Shopify apps using
          Shopify's recommended stack including:
          <ul>
            <li>Shopify App Bridge</li>
            <li>React Router</li>
            <li>Prisma ORM</li>
            <li>SQLite Database</li>
            <li>TypeScript</li>
          </ul>
          You can start customizing and building your app from here.
        </s-paragraph>
      </s-section>
    </s-page>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
