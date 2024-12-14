export default function useIsAuthValid() {
  return sessionStorage.getItem("bearerToken") != null;
}
