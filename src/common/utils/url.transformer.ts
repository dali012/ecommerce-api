export function transformUrl(url: string) {
  const pathSegment = 'storage/v1/object/public';
  const targetSegment = 'product_images';

  return url.replace(`/${targetSegment}/`, `/${pathSegment}/${targetSegment}/`);
}
