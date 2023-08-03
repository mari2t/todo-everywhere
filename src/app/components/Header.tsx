import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  return (
    <header
      className={`flex items-center justify-start  text-black p-4 bg-black bg-opacity-40 mb-4`}
    >
      <Link href="/">
        <div className="flex items-center">
          <div className="h-6 w-6 relative">
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: "50%", // 半径を50%にすることで円形にする
                overflow: "hidden", // 円形以外の部分を隠す
              }}
            >
              <Image
                src="/img/todoeverywhere.jpg"
                alt="Logo"
                width={300}
                height={300}
              />
            </div>
          </div>
          <h1 className="ml-2 text-2xl text-white">Todo Everywhere</h1>
        </div>
      </Link>
    </header>
  );
};

export default Header;
