import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
// import CreateProductForm from '@/components/product/CreateProductForm'

async function AdminDashboard() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col px-3">
      {/* <CreateProductForm /> */}
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  Image
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {products.map((product, idx) => (
                <TableRow key={idx}>
                  <TableCell className='hidden sm:table-cell'>
                    <Image
                      alt='Product image'
                      className='aspect-square rounded-md object-cover'
                      height='64'
                      src='/product.png'
                      width='64'
                    />
                  </TableCell>
                  <TableCell className='font-medium'>{product.title}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className='hidden md:table-cell'>
                    ${product.price}
                  </TableCell>

                  <TableCell>
                    <ProudctActions productId={product.id} />
                  </TableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </CardContent>
        {/* TODO -- Pagination */}
        {/* <CardFooter>
          <div className='text-xs text-secondary'>
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter> */}
      </Card>
    </div>
  );
}

export default AdminDashboard;
