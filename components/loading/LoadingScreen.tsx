export default function LoadingScreen() {
  return (
    <div className="absolute bottom-0 right-0 z-50 flex h-[calc(100vh-5rem)] w-[calc(100%-250px)] items-center justify-center bg-[#F8F8F8]">
      <div className="loader" />
    </div>
  );
}
