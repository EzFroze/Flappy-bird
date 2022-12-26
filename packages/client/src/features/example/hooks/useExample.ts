export const useExample = (arg?: any) => {
  const [ data, setData ] = useState<any>(null)

  useEffect(() => {
    console.log('example hook argument', arg)
  }, [arg])

  return [data, setData]
}