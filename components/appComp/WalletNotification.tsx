import { toast } from "react-hot-toast";

export interface IWalletNotification {
  publicKey: string;
  shortAddress: string;
  walletName: string;
  metadata: {
    name: string;
    url: string;
    icon: string;
  };
}

export interface IUnifiedWalletConfig {
  autoConnect: boolean;
  metadata: IUnifiedWalletMetadata;
  env: any;
  notificationCallback?: {
    onConnect: (props: IWalletNotification) => void;
    onConnecting: (props: IWalletNotification) => void;
    onDisconnect: (props: IWalletNotification) => void;
    onNotInstalled: (props: IWalletNotification) => void;
  };
  walletlistExplanation?: {
    href: string;
  };
}

export interface IUnifiedWalletMetadata {
  name: string;
  url: string;
  description: string;
  iconUrls: string[]; // full uri, first icon will be used as main icon (png, jpg, svg)
  additionalInfo?: string;
}

const WalletNotification: IUnifiedWalletConfig["notificationCallback"] = {
  onConnect: (props: IWalletNotification) => {
    toast.success(
      <div tw="flex flex-col bg-green-100 w-full p-4">
        <span tw="font-semibold">Wallet Connected</span>
        <span tw="text-xs text-black/50">{`Connected to wallet ${props.shortAddress}`}</span>
      </div>,
      {
        style: {
          padding: 0,
          margin: 0,
        },
      }
    );
  },
  onConnecting: (props: IWalletNotification) => {
    toast.custom(
      <div tw="flex flex-col p-4">
        <span tw="font-semibold">Connecting to {props.walletName}</span>
      </div>,
      {
        style: {
          padding: 0,
          margin: 0,
        },
      }
    );
  },
  onDisconnect: (props: IWalletNotification) => {
    toast.custom(
      <div tw="flex flex-col p-4">
        <span tw="font-semibold">Disconnected from {props.walletName}</span>
        <span tw="text-xs text-black/50">{`Disconnected from wallet ${props.shortAddress}`}</span>
      </div>,
      {
        style: {
          padding: 0,
          margin: 0,
        },
      }
    );
  },
  onNotInstalled: (props: IWalletNotification) => {
    toast.error(
      <div tw="flex flex-col bg-red-100 w-full p-4">
        <span tw="font-semibold">
          {props.walletName} Wallet is not installed
        </span>
        <span>
          {`Please go to the provider`}{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            tw="underline font-bold"
            href={props.metadata.url}
          >
            {`website`}
          </a>{" "}
          {`to download.`}
        </span>
      </div>,
      {
        style: {
          padding: 0,
          margin: 0,
        },
      }
    );
  },
};

export default WalletNotification;
