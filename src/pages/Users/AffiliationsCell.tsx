import { useState } from 'react';
import { UserDataType } from '@/services/users/useListUsers';
import { Row } from '@tanstack/react-table';

import AffiliationsModal from '@/components/modals/AffiliationDetails';

export const AffiliationsCell = ({ row }: { row: Row<UserDataType> }) => {
  const [openModalAffiliations, setOpenModalAffiliations] = useState(false);

  console.log({ row });
  console.log('abriuuu');

  return (
    <AffiliationsModal
      open={openModalAffiliations}
      onOpenChange={setOpenModalAffiliations}
      userId={row.original.id}
      userName={row.original.name}
      affiliations={[]}
    />
  );
};
