export const LoadingScreen = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-temple-gray">
      <div className="text-center font-chinese">
        <div className="text-4xl text-imperial-gold animate-lantern-float">
          加载中...
          <span className="block text-xl mt-2">Loading...</span>
        </div>
      </div>
    </div>
  )
} 