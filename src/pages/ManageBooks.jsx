import { BookGrid } from "../components/BookGrid";
import { AppLayout } from "../layouts/AppLayout";
import { headers } from "../services/utils";

export function ManageBooks() {
  return (
    <div>
      <AppLayout>
        <BookGrid />
      </AppLayout>
    </div>
  );
}
