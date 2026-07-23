"use client";

// - - - - - Components - - - - -
import Form from "@/components/form/form.component";

// - - - - - Hooks - - - - -
import { useToast } from "@/hooks";

// - - - - - API - - - - -
import { createGroup, updateGroup } from "@/api/services/group";

const GroupForm = ({
  currentData,
  updateMode,
  setLoading,
  getData,
  loading,
  handleClose,
}) => {
  const toast = useToast();

  

  return (
    
  );
};

export default GroupForm;
