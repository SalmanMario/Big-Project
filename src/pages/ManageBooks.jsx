import { BookGrid } from "../components/BookGrid";
import { AppLayout } from "../layouts/AppLayout";

export function ManageBooks() {
  return (
    <div>
      <AppLayout>
        <BookGrid />
      </AppLayout>
    </div>
  );
}
